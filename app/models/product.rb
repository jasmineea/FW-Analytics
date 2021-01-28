class Product < ApplicationRecord
    after_save { Keen.publish 'products' , self }
end
