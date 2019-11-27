class CreateBooks < ActiveRecord::Migration[6.0]
  def change
    create_table :books do |t|
      t.string :name
      t.string :isbn
      t.string :book_identifier
      t.json :rating
      t.belongs_to :shelf, null: false, foreign_key: true
      

      t.timestamps
    end
  end
end
