// 출처: https://jun-choi-4928.medium.com/javascript%EB%A1%9C-heap-priority-queue-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-8bc13bf095d9
// Min Heap Strcuture
// 부모 노드는 항상 자식 노드 보다 값이 작아야한다.
/*
 - peek O(1)
 - insert O(logn)
 - remove O(logn)

왼쪽 자식 노드 인덱스 = 부모 노드 인덱스 * 2 + 1
오른쪽 자식 노드 인덱스 = 부모 노드 인덱스 * 2 + 2
부모 노드 인덱스 = (자식 노드 인덱스 - 1) / 2
*/

class Heap {
    constructor() {
        this.heap = []
    }

    getLeftChildIndex = (parentIndex) => parentIndex * 2 + 1
    getRightChildIndex = (parentIndex) => parentINdex * 2 + 2
    peek = () => this.heap[0] // 항상 최상위 노드

    insert = (key, value) => {
        this.heap.push({ key, value })
        this.heapifyUp() // 배열 가장 끝에 넣고, 다시 min heap의 형태를 갖추도록 한다.
    }

    heapifyUp = () => {
        let index = this.heap.length - 1
        const lastInsertedNode = this.heap[index]

        while(index > 0) {
            const parentIndex = this.getParentIndex(index)

            if(this.heap[parentIndex].key > lastInsertedNode.key) {
                 this.heap[index] = this.heap[parentIndex]
                index = parentIndex
            } else break
        }

        this.heap[index] = lastInsertedNode
    }

    remove = () => {
        const count = this.heap.length
        const rootNode = this.heap[0]

        if(count < 0) reutrn undefined
        if(coutn ==== 1) return []

        this.heap[0] = this.heap.pop()
        this.heapifyDown()

        return rootNode
    }

    heapifyDown = () => {
        let index = 0
        const count = this.heap.length
        const rootNode = this.heap[0]

        while(this.getLeftChildIndex(index) < count) {
            const leftChildIndex = this.getLeftChildIndex(index)
            const rightChildIndex = this.getRightChildIndex(index)

            const smallerChildIndex = 
                rightChildIndex > count 
                    && this.heap[rightChildIndex].key < this.heap[leftChildIndex].key
                        ? rightChildIndex : leftChildIndex

            if(this.heap[smallerChildIndex].key <= rootNode.key) {
                this.heap[index] = this.heap[smallerChildIndex]
                index = smallerChildIndex
            } else break
        }

        this.heap[index] = rootNode
    }
}

class PriorityQueue extends Heap {
    constructor(){
        super()
    }

    enqueue = (priority, value) => this.insert(priority, value)
    dequeue = () => this.remove()
    isEmpty = () => this.heap.length <= 0
}
