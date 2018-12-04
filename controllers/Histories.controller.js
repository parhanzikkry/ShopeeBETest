var Sequelize = require(__dirname + '/../dbconnection'),
    Op = Sequelize.Op,
    HistoriesModel = Sequelize.import(__dirname + '/../models/Histories.model'),
    TracksModel = Sequelize.import(__dirname + '/../models/Tracks.model');

HistoriesModel.belongsTo(TracksModel, {
    foreignKey: 'fk_track_id'
});

TracksModel.hasMany(HistoriesModel, {
    foreignKey: 'fk_track_id'
});

class Histories {
    constructor() {}

    IsDateValid(date) {
        var check = date.split("-");
        var newDate;
        if(check.length == 3 && check[0].length == 4 && check[1].length == 2 && check[2].length == 2) {
            newDate = new Date(check[0], check[1]-1, check[2]);
            if(newDate.getFullYear() == check[0] && newDate.getMonth() == check[1]-1 && newDate.getDate() == check[2]) {
                return true;
            }
        }
        return false
    }

    ChangeToDateFormat(date) {
        var data = date.split("-");
        return new Date(data[0], data[1]-1, data[2]);
    }

    CreateHistory(req, res) {
        if(!this.IsDateValid(req.body.date) || req.body.rate == null || req.body.from == null || req.body.to == null) {
            res.json({
                status: {
                    code: 400,
                    success: false,
                },
                message: 'data input tidak lengkap / valid'
            });
        } else {
            var from = req.body.from.toUpperCase();
            var to = req.body.to.toUpperCase();
            TracksModel
                .findOne({
                    where: {
                        from: from,
                        to: to
                    }
                })
                .then((tracks) => {
                    if(tracks == null) {
                        res.json({
                            status: {
                                code: 400,
                                success: false,
                            },
                            message: 'Data tidak di track'
                        });
                    } else {
                        var date = this.ChangeToDateFormat(req.body.date);
                        tracks = JSON.parse(JSON.stringify(tracks));
                        HistoriesModel
                            .findOne({
                                where: {
                                    history_date: date,
                                    fk_track_id: tracks.id
                                }
                            })
                            .then((isHistory) => {
                                if(isHistory != null) {
                                    res.json({
                                        status: {
                                            code: 400,
                                            success: false,
                                        },
                                        message: 'Data history sudah ada'
                                    });
                                } else {
                                    HistoriesModel
                                        .create({
                                            history_date: date,
                                            history_rate: req.body.rate,
                                            fk_track_id: tracks.id
                                        })
                                        .then((result) => {
                                            res.json({
                                                status: {
                                                    code: 200,
                                                    success: true,
                                                },
                                                message: 'Data berhasil ditambahkan',
                                            });
                                        })
                                        .catch((err) => {
                                            res.json({
                                                status: {
                                                    code: 500,
                                                    success: false,
                                                },
                                                message: 'gagal dalam menambahkan data history',
                                                info: err,
                                            });
                                        });
                                }
                            })
                            .catch((err) => {
                                res.json({
                                    status: {
                                        code: 500,
                                        success: false,
                                    },
                                    message: 'Gagal dalam melakukan pengecheckan data history',
                                    info: err,
                                });
                            });
                    }
                })
                .catch((err) => {
                    res.json({
                        status: {
                            code: 500,
                            success: false,
                        },
                        message: 'gagal dalam mengecheck data track',
                        info: err,
                    })
                })
        }
    }

    GetSevenDaysOfHistoriesByDate(req, res) {
        if(!this.IsDateValid(req.params.date)) {
            res.json({
                status: {
                    code: 400,
                    success: false,
                },
                message: 'date invalid'
            });
        } else {
            var date = this.ChangeToDateFormat(req.params.date);
            TracksModel
                .findAll({
                    order: [
                        ['id', 'asc'],
                        [HistoriesModel, 'history_date', 'desc'],
                    ],
                    include: [{
                        model: HistoriesModel,where: {
                            history_date: {
                                [Op.lte]: date,
                                [Op.gt]: date - (7*24*60*60*1000),
                            }
                        },
                        required: false
                    }]
                })
                .then((result) => {
                    result = JSON.parse(JSON.stringify(result));
                    var data = [];
                    var temp;
                    for(let i=0; i<result.length; i++) {
                        temp = {
                            id: result[i].id,
                            from: result[i].from,
                            to: result[i].to,
                            avg: 0,
                            rate: 0,
                        }
                        if(result[i].histories.length == 7) {
                            var count = 0;
                            for(let j=0; j<result[i].histories.length; j++) {
                                count+= result[i].histories[j].history_rate;
                            }
                            temp.avg = count/7;
                        } else {
                            temp.avg = 'insufficient data';
                        }
                        if(result[i].histories.length != 0 && result[i].histories[0].history_date == req.params.date) {
                            temp.rate = result[i].histories[0].history_rate;
                        } else {
                            temp.rate = 'insufficient data';
                        }
                        data.push(temp);
                    }
                    res.json({
                        status: {
                            code: 200,
                            success: true,
                        },
                        message: 'Berhasil mendapatkan data',
                        data: data
                    })
                })
                .catch((err) => {
                    res.json({
                        status: {
                            code: 500,
                            success: false,
                        },
                        message: 'gagal mendapatkan data',
                        info: err,
                    })
                })
        }
    }

    GetSevenDaysOfHistoriesByTrack(req, res) {
        if(req.params.from == null || req.params.to == null) {
            res.json({
                status: {
                    code: 400,
                    success: false,
                },
                message: 'Data yang dikirimkan tidak benar',
            });
        } else {
            var from = req.params.from.toUpperCase();
            var to = req.params.to.toUpperCase();
            TracksModel
                .findOne({
                    where: {
                        from: from,
                        to: to,
                    }
                })
                .then((isTrack) => {
                    if(isTrack == null) {
                        res.json({
                            status: {
                                code: 400,
                                success: false,
                            },
                            message: 'Data yang diminta belum ditrack'
                        });
                    } else {
                        isTrack = JSON.parse(JSON.stringify(isTrack));
                        HistoriesModel
                            .findAll({
                                where: {
                                    fk_track_id: isTrack.id
                                },
                                limit: 7,
                                order: [
                                    ['history_date', 'desc'],
                                ],
                            })
                            .then((result) => {
                                result = JSON.parse(JSON.stringify(result));
                                if(result.length == 0) {
                                    res.json({
                                        status: {
                                            code: 204,
                                            success: false
                                        },
                                        message: 'data yang diinginkan belum di entry',
                                    });
                                } else {
                                    var data;
                                    var tempHistory = [];
                                    var min = result[0].history_rate;
                                    var max = result[0].history_rate;
                                    var count = 0;
                                    for(let i=0; i<result.length; i++) {
                                        tempHistory.push({
                                            date: result[i].history_date,
                                            rate: result[i].history_rate
                                        });
                                        if(min > result[i].history_rate) {
                                            min = result[i].history_rate;
                                        }
                                        if(max < result[i].history_rate) {
                                            max = result[i].history_rate;
                                        }
                                        count+=result[i].history_rate;
                                    }
                                    data = {
                                        from: from,
                                        to: to,
                                        history: tempHistory,
                                        avg: count/result.length,
                                        var: max - min
                                    }
                                    res.json({
                                        status: {
                                            code: 200,
                                            success: true,
                                        },
                                        message: 'data yang dinginkan berhasil didapatkan',
                                        data: data
                                    });
                                }
                            })
                            .catch((err) => {
                                res.json({
                                    status: {
                                        code: 500,
                                        success: false,
                                    },
                                    message: 'gagal dalam mendapatkan data',
                                    info: err,
                                });
                            });
                    }
                })
                .catch((err) => {
                    res.json({
                        status: {
                            code: 500,
                            success: false,
                        },
                        message: 'gagal dalam melakukan pengecheckan data track',
                        info: err,
                    });
                });
        }
    }
}

module.exports = new Histories;