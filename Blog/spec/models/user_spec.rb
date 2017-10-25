require 'rails_helper'

RSpec.describe User, type: :model do
  describe "validations" do
    it "has a first_name and a last name" do
      u = User.new
      u.valid?
      expect(u.errors.messages).to have_key(:first_name)
      expect(u.errors.messages).to have_key(:last_name)
    end

    it "has a valid email" do
      u = User.new(email: "aaaa")
      u.valid?
      expect(u.errors.messages).to have_key(:email)
    end
  end
end
