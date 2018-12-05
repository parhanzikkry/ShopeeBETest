var Sequelize = require(__dirname + '/../dbconnection'),
    HistoriesModel = Sequelize.import(__dirname + '/../models/Histories.model'),
    TracksModel = Sequelize.import(__dirname + '/../models/Tracks.model');

class Tracks {
    constructor() {

    }

    GetAllTracks(req, res) {
        TracksModel
            .findAll({
                attributes: ['id', 'from', 'to']
            })
            .then((result) => {
                result = JSON.parse(JSON.stringify(result));
                if(result.length == null || result.length == 0) {
                    res.json({
                        status: {
                            code: 204,
                            success: false,
                        },
                        message: 'Tidak terdapat data track',
                    });
                } else {
                    res.json({
                        status: {
                            code: 200,
                            success: true,
                        },
                        message: 'berhasil mendapatkan semua data track',
                        data: result,
                    });
                }
            })
            .catch((err) => {
                res.json({
                    status: {
                        code: 500,
                        succcess: false,
                    },
                    message: 'tidak dapat mendapatkan data saat query',
                    info: err
                });
            });
    }

    AddTrack(req, res) {
        // check apakah inputan valid atau tidak
        if(req.body.from == null || req.body.to == null || req.body.to == req.body.from) {
            res.json({
                status: {
                    code: 400,
                    success: false,
                },
                message: 'data yang dikirimkan tidak sempurna'
            });
        } else {
            // convert into uppercase
            var from = req.body.from.toUpperCase();
            var to = req.body.to.toUpperCase();
            // check apakah sudah terdapat data track yang sesuai
            TracksModel
                .findOne({
                    where: {
                        from: from,
                        to: to,
                    }
                })
                .then((track) => {
                    if(track != null) {
                        res.json({
                            status: {
                                code: 400,
                                success: false
                            },
                            message: 'data track yang ingin ditambahkan sudah ada'
                        });
                    } else {
                        // menambahkan data track
                        TracksModel
                            .create({
                                to: to,
                                from: from
                            })
                            .then((result) => {
                                res.json({
                                    status: {
                                        code: 200,
                                        success: true,
                                    },
                                    message: 'berhasil menambahkan data track'
                                })
                            })
                            .catch((err) => {
                                res.json({
                                    status: {
                                        code: 400,
                                        success: false,
                                    },
                                    message: 'gagal menambahkan data track pada saat query',
                                    info: err,
                                })
                            });
                    }
                })
                .catch((err) => {
                    console.log(err)
                    res.json({
                        status: {
                            code: 400,
                            success: false,
                        },
                        message: 'gagal melakukan pengecheckan pada saat query',
                        info: err
                    })
                });
        }
        
    }

    DeleteOneTrack(req, res) {
        if(req.params.id == null) {
            res.json({
                status: {
                    code: 400,
                    success: false,
                },
                message: 'parameter yang dikirimkan tidak sesuai'
            });
        } else {
            HistoriesModel
                .destroy({
                    where:{
                        fk_track_id: req.params.id
                    }
                })
                .then((isDeleted) => {
                    TracksModel
                    .destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                    .then((result) => {
                        if(result == 0) {
                            res.json({
                                status: {
                                    code: 400,
                                    succcess: false,
                                },
                                message: 'Data yang dihapus tidak ada'
                            });
                        } else {
                            res.json({
                                status: {
                                    code: 200,
                                    success: true,
                                },
                                message: 'berhasil menghapus data track'
                            });
                        }
                    })
                    .catch((err) => {
                        res.json({
                            status: {
                                code: 500,
                                success: false, 
                            },
                            message: 'Gagal menghapus data pada saat query',
                            info: err
                        });
                    });
                })
                .catch((err) => {
                    res.json({
                        status: {
                            code: 500,
                            succcess: false,
                        },
                        message: 'Gagal menghapus data history terlebih dahulu',
                        info: err,
                    });
                });
        }
    }
}

module.exports = new Tracks;