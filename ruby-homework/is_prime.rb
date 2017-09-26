def is_prime?(number)
    if number == 1
        return false
    
    else
        for num in 2..(number/2)
            if number%num == 0
                return false
            end
        end
    end
    true
end




#test
if __FILE__ == $0
    puts is_prime?(8)
    puts is_prime?(3)
    puts is_prime?(81)
    puts is_prime?(83)
end
                