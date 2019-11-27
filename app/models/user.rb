class User < ApplicationRecord
  has_secure_password

  validates_presence_of :email
  validates_uniqueness_of :email

  before_create :randomize_public_id
  has_many :books, :through => :shelves
  has_many :shelves

  def generate_password_token!
    begin
      self.reset_password_token = SecureRandom.urlsafe_base64
    end while User.exists?(reset_password_token: self.reset_password_token)
    self.reset_password_token_expires_at = 1.day.from_now
    save!
  end

  def clear_password_token!
    self.reset_password_token = nil
    self.reset_password_token_expires_at = nil
    save!
  end

  private
  def randomize_public_id
    begin
      self.public_user_id = SecureRandom.hex(8)
    end while User.where(public_user_id: self.public_user_id).exists?
  end
end
