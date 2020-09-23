const stripe= require("stripe")
("sk_test_51H55RwE3p3Iu3fsVVSFLrVwvUHFq9j5zpRogp0mawYbCeCjNwyTVFqUjvmsr3hhzZRk9SehdwmYSQeQpymHGVL4p00BKvEW1zm")
const uuid= require("uuid/v4");

exports.makePayment=(req,res)=>{
    const {products, token}= req.body;
    console.log("PRODUCTS", products)

    let amount=0;
    products.map(p=>{
        amount=amount+p.price;
    });
    const idempotencyKey= uuid();

    return stripe.customer.create({
        email: token.email,
        source: token.id,
    }).then(customer=>{
        stripe.charges
        .create({
            amount: amount *100 ,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: "a test account",
            shipping:{
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.city,
                    country: token.card.country,
                    postal_code: token.card.address_zip
                }
            }
        },{idempotencyKey})
        .then(result=>res.status(200).json(result)) 
        .catch(err=>console.log(err));
    })
}