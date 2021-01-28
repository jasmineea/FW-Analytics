namespace :coupons do
  require "csv"
  desc "TODO"
  task products: :environment do
    csv_text = File.read(Rails.root.join("lib", "coupons.csv"))
puts csv_text
csv = CSV.parse(csv_text, :headers => true, encoding: 'iso-8859-1:utf-8')
csv.each do |row|
  p = Product.new
  p.order_id = row["Order ID"]
  p.order_number = row["Or Number "]
  p.order_created = row["Order Created At"]
  p.total = row["Total"]
  p.billing_address_first_name = row["Billing Address First Name"]
  p.billing_address_last_name = row["Billing Address Last Name"]
  p.customer_ip = row["Customer IP"]
  p.referring_site = row["Referring Site"]
end
puts "There are now #{Product.count} rows in the product table"
  end



end
