<?php

namespace App\Repositories\Base;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

interface EloquentRepositoryInterface
{
    /**
     * Get all models.
     */
    public function all(array $columns = ['*'], array $relations = []): Collection;

    /**
     * Method limit
     *
     * @param  int  $limit  [limit]
     * @param  array  $columns  [required columns]
     * @param  array  $relations  [required relations]
     */
    public function limit(int $limit, array $columns = ['*'], array $relations = []): Collection;
    /**
     * @param array $paramsAndData
     *
     * @return int
     */
    public function getCountByColumn(
        array $paramsAndData,
        array $columns = ['*'],
        array $relations = []
    ): ?int;

    /**
     * Method paginate
     *
     * @param  int  $number  [number of records per page]
     */
    public function paginate(int $number);

    /**
     * Get all trashed models.
     */
    public function allTrashed(): Collection;

    /**
     * Find model by id.
     */
    public function findById(
        int $modelId,
        array $columns = ['*'],
        array $relations = [],
        array $appends = []
    ): ?Model;

    /**
     * Find model by id.
     *
     * @param  array  $modelId
     * @param  array  $appends
     */
    public function findByColumn(
        array $paramsAnddData,
        array $columns = ['*'],
        array $relations = []
    ): ?Model;

    /**
     * Find model by columns.
     *
     * @param  array  $modelId
     * @param  array  $appends
     */
    public function getByColumn(
        array $paramsAnddData,
        array $columns = ['*'],
        array $relations = []
    ): ?Collection;

    /**
     * Find model by existsByColumn.
     *
     * @param  array  $modelId
     */
    public function existsByColumn(
        array $paramsAnddData,
        array $columns = ['*']
    ): ?bool;

    /**
     * Find trashed model by id.
     */
    public function findTrashedById(int $modelId): ?Model;

    /**
     * Find only trashed model by id.
     */
    public function findOnlyTrashedById(int $modelId): ?Model;

    /**
     * Find model by id.
     *
     * @param  array  $modelId
     * @param  array  $appends
     */
    public function findByColumnLatest(
        array $paramsAnddData,
        array $columns = ['*'],
        array $relations = [],
        string $orderByColumn = 'created_at'
    ): ?Model;

    /**
     * Create a model.
     */
    public function create(array $payload): ?Model;

    /**
     * Create or update a model.
     */
    public function createOrUpdate(array $attributes, array $values): Model;

    /**
     * Method createMany
     *
     * @param  array  $payloadCollection  [collection of payload]
     */
    public function createMany(array $payloadCollection): ?Collection;

    /**
     * Update existing model.
     */
    public function update(int $modelId, array $payload): bool;

    public function updateWithTrashed(int $modelId, array $payload): bool;

    /**
     * Delete model by id.
     */
    public function deleteById(int $modelId): bool;

    /**
     * @return void
     */
    public function deleteByIds(array $modelIds): bool;

    /**
     * Delete model by columns.
     *
     * @return int
     */
    public function deleteByColumn(array $paramsAndData);

    /**
     * Restore model by id.
     */
    public function restoreById(int $modelId): bool;

    /**
     * Permanently delete model by id.
     */
    public function permanentlyDeleteById(int $modelId): bool;

    /**
     * filter
     *
     * @param  mixed  $filters
     * @param  mixed  $with
     */
    public function filter($filters, $with = []): LengthAwarePaginator;
}
