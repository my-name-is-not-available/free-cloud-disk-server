const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// 设置上传文件的存储引擎
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'data/'); // 上传文件存储的目录
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// 初始化multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 193986560 } 
});

// 创建上传目录
if (!fs.existsSync('data/')) {
    fs.mkdirSync('data/');
}

// 文件上传路由
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('文件上传成功');
});
// 返回剩余空间
app.get('/sp', async (req, res) => {
    const totalSpace = 193986560; // 总空间
    const usedSpace = await dataFolderSize().catch(err => {console.error(err); res.status(500).send('服务器错误')}); // 已使用空间
    
    const remainingSpace = totalSpace - usedSpace || 0; // 计算剩余空间
    
    res.json({ remainingSpace: remainingSpace });
});
// 文件下载路由
app.get('/:filename', (req, res) => {
    // 构建文件路径
    const filePath = path.join(__dirname, 'data', req.params.filename);
    
    // 检查文件是否存在
    if (fs.existsSync(filePath)) {
        res.download(filePath); // 设置HTTP头为Content-Disposition: attachment; filename=...
    } else {
        res.status(404).send('文件未找到');
    }
});

// 计算data文件夹大小的函数
function dataFolderSize() {
    return new Promise((resolve, reject) => {
        let totalSize = 0;
        const dirPath = path.join(__dirname, 'data');
        
        fs.readdir(dirPath, (err, files) => {
            if (err) return reject(err);
            
            if (files.length === 0) {
                // 如果文件夹为空，直接返回0
                resolve(totalSize);
            } else {
                let processedFiles = 0;
                files.forEach((file) => {
                    fs.stat(path.join(dirPath, file), (err, stat) => {
                        if (err) return reject(err);
                        if (stat.isFile()) totalSize += stat.size;
                        processedFiles++;
                        
                        // 检查是否所有文件都已处理
                        if (processedFiles === files.filter(f => !f.startsWith('.')).length) {
                            resolve(totalSize);
                        }
                    });
                });
            }
        });
    });
}



// 文件删除路由
app.delete('/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'data', req.params.filename);
    fs.unlink(filePath, (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.status(404).send('文件未找到');
            } else {
                res.status(500).send('服务器错误');
            }
        } else {
            res.send('文件删除成功');
        }
    });
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器已启动在 http://localhost:${port}`);
});
