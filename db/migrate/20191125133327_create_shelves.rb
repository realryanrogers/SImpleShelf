class CreateShelves < ActiveRecord::Migration[6.0]
  def change
    create_table :shelves do |t|
      t.string :name
      t.belongs_to :user, null: false, foreign_key: true, type: :uuid
      t.boolean :public

      t.timestamps
    end
  end
end
