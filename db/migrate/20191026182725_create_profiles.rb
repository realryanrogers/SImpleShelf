class CreateProfiles < ActiveRecord::Migration[6.0]
  def change
    create_table :profiles do |t|
      t.belongs_to :user, type: :uuid, null: false, foreign_key: true
      t.string :name
      t.integer :age
      t.string :city

      t.timestamps
    end
  end
end
