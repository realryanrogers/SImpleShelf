class CreateMedia < ActiveRecord::Migration[6.0]
  def change
    create_table :media do |t|
      t.belongs_to :user, type: :uuid, null: false, foreign_key: true
      t.string :name
      t.string :property_type

      t.timestamps
    end
  end
end
