class AddInfoToBooks < ActiveRecord::Migration[6.0]
  def change
    add_column :books, :author, :string
    add_column :books, :title, :string
  end
end
