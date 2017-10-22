require 'date'
class Post < ApplicationRecord

    validates :title, presence: true

    validates :body,presence: true, length:{minimum: 50}
   
    def formatted_time
        DateTime.parse(self.created_at.to_s)
    end

    before_validation :titleize

    def titleize
        self.title = self.title.titleize if title.present?
    end



end
