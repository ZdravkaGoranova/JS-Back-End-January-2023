exports.generatePaymentMethod = function (paymentMethod) {
    const paymentMethods = [
        { key: 'crypto-wallet', label: "Crypto Wallet", selected: false },
        { key: 'credit-card', label: "Credit Card", selected: false },
        { key: 'debit-card', label: "Debit Card", selected: false },
        { key: 'paypal', label: "PayPal", selected: false },

    ];

    //const isSelected = crypto.paymentMethod == key

    const result = paymentMethods.map(x => x.key == paymentMethod ? { ...x, selected: true } : x);
    //console.log(result)
    
    return result;
};

exports.isOwner = (user, book) => {

    //return crypto.owner.toString() == user._id;// x.key === paymentMethod
    // return crypto.owner == user._id;// x.key == paymentMethod
    return book.owner == user?._id;
};