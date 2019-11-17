class CreateRatings < ActiveRecord::Migration[6.0]
  def change
    create_table :ratings do |t|
      t.integer :value
      t.belongs_to :user, null: false, foreign_key: true, type: :uuid
      t.string :type_id
      t.string :media_type

      t.timestamps
    end
  end
end
