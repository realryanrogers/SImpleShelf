class AddGoogleIdToRatings < ActiveRecord::Migration[6.0]
  def change
    add_column :ratings, :google_id, :string
  end
end
