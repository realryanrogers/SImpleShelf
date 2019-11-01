class AddIdentifierToMedia < ActiveRecord::Migration[6.0]
  def change
    add_column :media, :media_id, :string
    add_column :media, :media_id_type, :string
  end
end
