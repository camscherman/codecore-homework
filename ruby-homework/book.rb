class Book
    def initialize(title)
        @title = title
        @chapters = []
    end

    def add_chapter(chap_name)
        @chapters << chap_name
    end

    def chapters
        count = @chapters.length
        curr_chap =1
        puts "#{@title} has #{count} chapters."
        @chapters.each do |chap|
            puts "#{curr_chap}. #{chap}"
            curr_chap += 1
        end
    end

end


#Tests #
if __FILE__ == $0
    book = Book.new("Huckleberry Finn")

    book.add_chapter("one")
    book.add_chapter("two")
    book.add_chapter("three")
    book.add_chapter("four")

book.chapters

end
