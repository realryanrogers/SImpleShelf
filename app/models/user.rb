class User < ApplicationRecord
  has_secure_password

  validates_presence_of :email
  validates_uniqueness_of :email

  before_create :randomize_public_id
  has_many :medias



  private
  def randomize_public_id
    begin
      self.public_user_id = SecureRandom.hex(8)
    end while User.where(public_user_id: self.public_user_id).exists?
  end
end
