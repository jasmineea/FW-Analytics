# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


require 'csv'



    
# def headersFromCSV (filename)
#     filename = headersFromCSV("Coupon_Sales.csv")
#     csvHeaderArray = CSV.read(filename, headers: true).headers
#     return csvHeaderArray.map { |colA| colA.strip.downcase.gsub(' ', '_').gsub('/', '_').gsub(/[^\w_]/, '') }
# end

CSV.foreach(Rails.root.join('lib/coupons.csv'), headers: true, encoding:'iso-8859-1:utf-8') do |row|
    Product.create!({
        :order_id => row["Order ID"],
        :order_number => row["Order Number"],
        :order_created => row["Order Created At"],
        :total => row["Total"],
        :billing_address_first_name => row["Billing Address First Name"],
        :billing_address_last_name => row["Billing Address Last Name"],
        :customer_ip => row["Customer IP"],
        :referring_site => row["Referring Site"],
    })
end
  
