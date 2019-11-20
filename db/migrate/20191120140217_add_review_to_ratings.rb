class AddReviewToRatings < ActiveRecord::Migration[6.0]
  def change
    add_column :ratings, :review, :text
  end
end
