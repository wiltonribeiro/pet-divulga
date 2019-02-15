import express = require('express');

export default interface Route {
    applyRoute(app: express.Application): void;
}