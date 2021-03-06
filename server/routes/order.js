const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const mongoose = require('mongoose');

router.post('/add/:id', (req, res, next) => {
    const orders = req.body;

    Order.findById(req.params.id)
        .then(order => {
            order.items.unshift(...req.body)
            order.save()
                .then(order => {
                    res.status(200).json(order);
                })
                .catch(err => {
                    res.status(500).json(err, {message: 'Error saving order'});
                });
        })
        .catch(err => {
            res.status(500).json(err, {message: 'Error finding error to place on'});
        });
});

router.get('/restaurant/:role/:restaurantId', (req, res, next) => {
    findKitchenOrders = () => {
        Order.find({restaurantId: req.params.restaurantId, status: 'open', items: {$elemMatch: {status: {$in: ['open', 'revise']}}}})
            .then(orders => {
                console.log(orders)
                res.status(200).json(orders)
            })
            .catch(err => {
                res.status(500).json({message: 'Error within database'})
            });
    };

    findServerOrders = () => {
        Order.find({restaurantId: req.params.restaurantId})
            .then(orders => {
                res.status(200).json(orders);
            })
            .catch(err => {
                res.status(500).json({message: 'Error within databse'});
            });
    };

    switch(req.params.role){
        case 'kitchen': findKitchenOrders(); break;
        case 'server': findServerOrders(); break;
    }

})

router.post('/status/:orderId', (req, res, next) => {
    Order.findById(req.params.orderId)
        .then(order => {
            const {status } = req.body;
            console.log('order: ', order)
            order.items = order.items.map(item => {
                item.status = status;
                return item;
            });
            switch(status){
                case 'open': order.status = status; break;
                case 'closed': order.status = status; break;
                default: break;
            }

            order.save()
                .then(order => {
                    res.status(200).json(order);
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json(err);
                });
        })
        .catch(err => {
            console.log('error: ', err)
            res.status(500).json(err);
        });
});

router.post('/item/status/:orderId', (req, res, next) => {
    Order.findById(req.params.orderId)
        .then(order => {
            const { itemId, status } = req.body;


            item = order.items.filter(e => e._id.toString() === itemId);

            item[0].status = status;

            order.save()
                .then(order => {
                    res.status(200).json(order);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        });
});

module.exports = router;