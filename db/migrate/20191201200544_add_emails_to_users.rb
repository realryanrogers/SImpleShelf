class AddEmailsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :marketingemail, :boolean, default: false
    add_column :users, :updateemail, :boolean, default: true
  end
end
