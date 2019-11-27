class AddUserToBooks < ActiveRecord::Migration[6.0]
  def change
    add_reference :books, :user, null: false, foreign_key: true, type: :uuid
  end
end
