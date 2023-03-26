
#include <vector>
#include <algorithm>
using namespace std;

class UnionFind {
    
    vector<int> parent;
    vector<int> rank;

public:
    explicit UnionFind(int totalNumberOfCities) {
        //'parent' and 'rank': value at index 0 not used since cities ID srtart from 1.
        parent.resize(totalNumberOfCities + 1);
        iota(parent.begin(), parent.end(), 0);
        rank.resize(totalNumberOfCities + 1);
    }

    int findParent(int index) {
        if (parent[index] != index) {
            parent[index] = findParent(parent[index]);
        }
        return parent[index];
    }

    void joinByRank(int firstCityID, int secondCityID) {
        int parentFirst = findParent(firstCityID);
        int parentSecond = findParent(secondCityID);
        if (parentFirst == parentSecond) {
            return;
        }

        if (rank[parentFirst] > rank[parentSecond]) {
            parent[parentSecond] = parentFirst;
        } else if (rank[parentFirst] < rank[parentSecond]) {
            parent[parentFirst] = parentSecond;
        } else {
            parent[parentSecond] = parentFirst;
            ++rank[parentFirst];
        }
    }
};

class Solution {
    
    static const int START_CITY_ID = 1; //destination city ID = totalNumberOfCities

public:
    int minScore(int totalNumberOfCities, const vector<vector<int>>& roads) const {
        UnionFind unionFind(totalNumberOfCities);
        groupConnectedCities(unionFind, roads);
        return findMinScoreOfPathBetweenStartAndDestination(unionFind, roads);
    }

private:
    int findMinScoreOfPathBetweenStartAndDestination(UnionFind& unionFind, const vector<vector<int>>& roads) const {
        int minScoreOfPath = INT_MAX;
        int parentOfStartCityID = unionFind.findParent(START_CITY_ID);
        for (const auto& road : roads) {
            if (unionFind.findParent(road[0]) == parentOfStartCityID) {
                minScoreOfPath = min(minScoreOfPath, road[2]);
            }
        }
        return minScoreOfPath;
    }

    void groupConnectedCities(UnionFind& unionFind, const vector<vector<int>>& roads) const {
        for (const auto& road : roads) {
            unionFind.joinByRank(road[0], road[1]);
        }
    }
};
