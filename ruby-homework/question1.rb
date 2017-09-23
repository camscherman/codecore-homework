require './helper_methods.rb'
class TitleizeInstance
    include HelperMethods
    def change_string(str)
        titleize(str)
    end
end


class TitleizeClass
    extend HelperMethods
    def change_string(str)
        titleize(str)
    end
end 

test_string ="This is a test string from a place in memory."
inc = TitleizeInstance.new

puts inc.titleize(test_string)

puts TitleizeClass.titleize(test_string)

