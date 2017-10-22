require 'rails_helper'

RSpec.describe Post, type: :model do
  describe 'validations' do
    it "requires title to be present" do
      n = Post.new()

      n.valid?

      expect(n.errors.messages).to have_key(:title)
    end

    it "requires body to be present and be at least 50chars long" do
      n = Post.new(body: "baaa")
      n.valid?

      expect(n.errors.messages).to have_key(:body)
    end
  
  end
end
