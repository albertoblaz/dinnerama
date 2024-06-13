class RecipesController < ApplicationController
  before_action :set_recipe, only: %i[ show ]

  # GET /recipes
  def index
    if params.has_key?(:ingredients)
      user_ingredients = params[:ingredients].split(",")
      user_ingredients << "water"

      @recipes = Recipe.all.filter do |recipe|
        recipe.ingredients.all? do |ri|
          user_ingredients.any? do |ui|
            begin
              ri.match(ui)
            rescue RegexpError
              false
            end
          end
        end
      end
    else
      @recipes = []
    end

    amend_image_url!(@recipes)

    render json: @recipes.sort { |a, b| b.ratings <=> a.ratings }
  end

  # GET /recipes/1
  def show
    amend_image_url!([@recipe])
    render json: @recipe
  end

  private
    def set_recipe
      @recipe = Recipe.find(params[:id])
    end

    def recipes_params
      params.permit(:ingredients)
    end

    def amend_image_url!(recipes)
      recipes.each do |recipe|
        recipe.image = recipe.image
          .split("url=")
          .last
          .gsub!("%3A", ":")
          .gsub!("%2F", "/")
      end
    end
end
