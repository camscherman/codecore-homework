
def city_printer(city_hash)
    city_hash.each do |province, cities|
        length = cities.length
        print "#{province} has #{length} main cities: #{cities[0]}"
        for index in 1...length
            if index == (length-1)
                print " and #{cities[index]}."
            else
                print ",#{cities[index]},"
            end
        end
    end
end

#Test 

major_cities = {BC: ["Vancouver", "Victoria", "Prince George"], AB: ["Edmonton", "Calgary"]}

city_printer(major_cities)
                