import type { MoviesRepository } from "@/repositories/movies-repository.js";
import type { UsersRepository } from "@/repositories/users-repository.js";
import type { Movie } from "@prisma/client";

interface CreateMoviesUseCaseRequest {
    title: string
    description: string
    poster_url: string
    genre_id: string
}

interface CreateMoviesUseCaseResponse {
    movie: Movie
}
export class CreateMoviesUseCase {
    constructor(private moviesRepository: MoviesRepository, private usersRepository: UsersRepository) {}

    async execute({ title, description, poster_url, genre_id }: CreateMoviesUseCaseRequest): Promise<CreateMoviesUseCaseResponse> {

    } 
}