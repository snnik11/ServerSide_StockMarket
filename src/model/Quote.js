 const Quote = function(data) {
    this.data = data;
    this.errors = [];
}
Quote.prototype.validateInput = function() {
    if(this.data =='') {
        this.errors.push("Please enter symbol")
    }
}

module.exports = Quote;