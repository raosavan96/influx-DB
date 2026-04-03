export const formatPaginatedResponse = (
    totalRecord: number,
    page: number,
    limit: number,
    data: any[],
    module: string,
    message: string = "Data fetched successfully",
) => {
    const totalPage = Math.ceil(totalRecord / limit);
    
    const nextPage = page < totalPage;
    const prevPage = page > 1;

    return {
        success: true,
        message: message,
        totalRecord: totalRecord,
        totalPage: totalPage,
        currentPage: page,
        perPage: limit,
        nextPage: nextPage,
        prevPage: prevPage,
        [module]: data
    };
};