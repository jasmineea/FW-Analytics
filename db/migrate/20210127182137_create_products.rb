class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.integer :order_id
      t.integer :order_number
      t.timestamp :order_created
      t.integer :total
      t.string :billing_address_first_name
      t.string :billing_address_last_name
      t.uuid :customer_ip
      t.string :referring_site

      t.timestamps
    end
  end
end
