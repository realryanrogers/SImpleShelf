class Shelf < ApplicationRecord
  belongs_to :user
  has_many :books

  validates_presence_of :name
end
