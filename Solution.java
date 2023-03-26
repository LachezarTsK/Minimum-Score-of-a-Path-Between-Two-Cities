
import java.util.stream.IntStream;

public class Solution {

    private static final int START_CITY_ID = 1;//destination city ID = totalNumberOfCities

    public int minScore(int totalNumberOfCities, int[][] roads) {
        UnionFind unionFind = new UnionFind(totalNumberOfCities);
        groupConnectedCities(unionFind, roads);
        return findMinScoreOfPathBetweenStartAndDestination(unionFind, roads);
    }

    private int findMinScoreOfPathBetweenStartAndDestination(UnionFind unionFind, int[][] roads) {
        int minScoreOfPath = Integer.MAX_VALUE;
        int parentOfStartCityID = unionFind.findParent(START_CITY_ID);
        for (int[] road : roads) {
            if (unionFind.findParent(road[0]) == parentOfStartCityID) {
                minScoreOfPath = Math.min(minScoreOfPath, road[2]);
            }
        }
        return minScoreOfPath;
    }

    private void groupConnectedCities(UnionFind unionFind, int[][] roads) {
        for (int[] road : roads) {
            unionFind.joinByRank(road[0], road[1]);
        }
    }
}

class UnionFind {

    int[] parent;
    int[] rank;

    UnionFind(int totalNumberOfCities) {
        //'parent' and 'rank': value at index 0 not used since cities ID srtart from 1.
        parent = IntStream.rangeClosed(0, totalNumberOfCities + 1).toArray();
        rank = new int[totalNumberOfCities + 1];
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
}
