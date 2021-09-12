const Stockmarket = function(data) {
    this.data = data;
    this.errors = [];
}

Stockmarket.prototype.validateUserInput = function() {
    if(this.data =='') {
        this.errors.push("The field cannot be empty. Please enter a symbol")
    } 
}

module.exports = Stockmarket;