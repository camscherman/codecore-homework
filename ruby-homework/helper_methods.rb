module HelperMethods
    def titleize(str)
        skip_words = %w[in the of and or from]
        words = str.split
        words = words.map { |word|  skip_words.include?(word) ? word: word.capitalize}
        ret_words = words.join(" ")
    end

end