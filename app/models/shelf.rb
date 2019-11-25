class Shelf < ApplicationRecord
  belongs_to :user
  has_many :ratings

  validates_presence_of :name
end
