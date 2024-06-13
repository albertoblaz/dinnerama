class CreateRecipes < ActiveRecord::Migration[7.1]
  def change
    create_table :recipes do |t|
      t.string :title
      t.string :category
      t.integer :cook_time
      t.integer :prep_time
      t.string :image
      t.float :ratings
      t.text :ingredients

      t.timestamps
    end
  end
end
