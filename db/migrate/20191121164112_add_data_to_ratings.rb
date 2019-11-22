class AddDataToRatings < ActiveRecord::Migration[6.0]
  def change
    add_column :ratings, :details, :json
  end
end
