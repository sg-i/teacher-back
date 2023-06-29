// pdfs.js
const express = require('express');
const db = require('../models');
const PDFs = db.pdf;
db.sequelize.query('SET GLOBAL max_allowed_packet=67108864');
const multer = require('multer');
const router = express.Router();
// Создаем хранилище для загруженных файлов
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20 мб
  },
});

router.get('/', async function (req, res) {
  try {
    if (req.isAuthenticated()) {
      try {
        const documents = await PDFs.findAll({
          attributes: ['id', 'name', 'description'], // Выберите необходимые атрибуты для отображения
        });
        res.json(documents);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving documents' });
      }
    } else {
      res.status(400).json({ error: 'Вы не имеете доступа к этой информации' });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id/download', express.raw({ type: '*/*' }), async function (req, res) {
  try {
    if (req.isAuthenticated()) {
      try {
        const document = await PDFs.findByPk(req.params.id);
        if (!document) {
          return res.status(404).json({ error: 'Document not found' });
        }

        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename="${'document'}"`);
        res.send(document.content);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error downloading document' });
      }
    } else {
      res.status(400).json({ error: 'Вы не имеете доступа к этой информации' });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/add', upload.single('file'), async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      if (!req.file) {
        return res.status(400).json({ error: 'File is required' });
      }
      const { originalname, buffer } = req.file;
      const { description } = req.body;

      const newDoc = {
        name: originalname,
        description: description,
        content: buffer,
      };

      const file = await PDFs.create(newDoc);

      res.json({ message: 'File uploaded successfully', file });
    } else {
      res.send('Вы не можете добавлять новости.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading file' });
  }
});

router.post('/delete', (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      PDFs.destroy({
        where: {
          id: req.body.id,
        },
      });
      res.send({ message: 'успех', dltId: req.body.id });
    } else {
      res.send('Вы не можете удалять документы.');
    }
  } catch (error) {
    res.send('Какая-то ошибка.');
  }
});

module.exports = router;
