
/**
 * @param {number} totalNumberOfCities
 * @param {number[][]} roads
 * @return {number}
 */
var minScore = function (totalNumberOfCities, roads) {
    this.START_CITY_ID = 1; //destination city ID = totalNumberOfCities
    const unionFind = new UnionFind(totalNumberOfCities);
    groupConnectedCities(unionFind, roads);
    return findMinScoreOfPathBetweenStartAndDestination(unionFind, roads);
};

/**
 * @param {UnionFind} unionFind
 * @param {number[][]} roads
 * @return {number}
 */
function findMinScoreOfPathBetweenStartAndDestination(unionFind, roads) {
    let minScoreOfPath = Number.MAX_SAFE_INTEGER;
    let parentOfStartCityID = unionFind.findParent(this.START_CITY_ID);
    for (let road of roads) {
        if (unionFind.findParent(road[0]) === parentOfStartCityID) {
            minScoreOfPath = Math.min(minScoreOfPath, road[2]);
        }
    }
    return minScoreOfPath;
}

/**
 * @param {UnionFind} unionFind
 * @param {number[][]} roads
 * @return {void}
 */
function groupConnectedCities(unionFind, roads) {
    for (let road of roads) {
        unionFind.joinByRank(road[0], road[1]);
    }
}


class UnionFind {

    /**
     * @param {number} totalNumberOfCities
     */
    constructor(totalNumberOfCities) {
        //'parent' and 'rank': value at index 0 not used since cities ID srtart from 1.
        this.parent = Array.from(Array(totalNumberOfCities + 1).keys());
        this.rank = new Array(totalNumberOfCities + 1).fill(0);
    }

    /**
     * @param {number} index
     * @return {number}
     */
    findParent(index) {
        if (this.parent[index] !== index) {
            this.parent[index] = this.findParent(this.parent[index]);
        }
        return this.parent[index];
    }

    /**
     * @param {number} firstCityID
     * @param {number} secondCityID
     * @return {void}
     */
    joinByRank(firstCityID, secondCityID) {
        let parentFirst = this.findParent(firstCityID);
        let parentSecond = this.findParent(secondCityID);
        if (parentFirst === parentSecond) {
            return;
        }

        if (this.rank[parentFirst] > this.rank[parentSecond]) {
            this.parent[parentSecond] = parentFirst;
        } else if (this.rank[parentFirst] < this.rank[parentSecond]) {
            this.parent[parentFirst] = parentSecond;
        } else {
            this.parent[parentSecond] = parentFirst;
            ++this.rank[parentFirst];
        }
    }
}
