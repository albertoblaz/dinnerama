class RecipesController < ApplicationController
  before_action :set_recipe, only: %i[ show ]

  # GET /recipes
  def index
    if params.has_key?(:ingredients)
      user_ingredients = params[:ingredients].split(",")

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
      # @recipes = Recipe.take(100)
      @recipes = []
    end

    render json: @recipes
  end

  # GET /recipes/1
  def show
    render json: @recipe
  end

  # POST /recipes
  # def create
  #  @recipe = Recipe.new(recipe_params)
  #
  #  if @recipe.save
  #    render json: @recipe, status: :created, location: @recipe
  #  else
  #    render json: @recipe.errors, status: :unprocessable_entity
  #  end
  # end

  # PATCH/PUT /recipes/1
  # def update
  #  if @recipe.update(recipe_params)
  #    render json: @recipe
  #  else
  #    render json: @recipe.errors, status: :unprocessable_entity
  #  end
  # end

  # DELETE /recipes/1
  # def destroy
  #  @recipe.destroy!
  # end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_recipe
      @recipe = Recipe.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    # def recipe_params
    #  params.require(:recipe).permit(:title, :category, :cook_time, :prep_time, :image, :rating, :ingredients_id)
    # end

    def recipes_params
      params.permit(:ingredients)
    end
end
