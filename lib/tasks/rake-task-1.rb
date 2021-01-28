namespace :csv do
    require 'csv'
    
    desc "generate a migration file from column names from the CSV headers"
    task create_migration: :environment do

        def headersFromCSV (filename)
            filename = headersFromCSV("Coupon_Sales.csv")
            csvHeaderArray = CSV.read(filename, headers: true).headers
            return csvHeaderArray.map { |colA| colA.strip.downcase.gsub(' ', '_').gsub('/', '_').gsub(/[^\w_]/, '') }
        end
    end
end