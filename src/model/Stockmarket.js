const Stockmarket = function(data) {
    this.data = data;
    this.errors = [];
}

Stockmarket.prototype.validateUserInput = function() {
    if(this.data =='') {
        this.errors.push("Please enter symbol")
    }
}

module.exports = Stockmarket;