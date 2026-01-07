/**
 * Sovereign OS - Client-Side RAG (Retrieval-Augmented Generation)
 * 
 * PDF → Embedding → Vector Store → Query pipeline.
 * All processing happens in browser - zero data leakage.
 */

import { useState, useCallback } from 'react';

interface DocumentChunk {
    id: string;
    content: string;
    embedding: number[];
    metadata: {
        source: string;
        page?: number;
        section?: string;
    };
}

interface RAGQuery {
    query: string;
    topK?: number;
    threshold?: number;
}

interface RAGResult {
    chunks: DocumentChunk[];
    answer: string;
}

/**
 * Simple vector similarity using cosine distance
 */
function cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) return 0;

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
        dotProduct += a[i] * b[i];
        normA += a[i] * a[i];
        normB += b[i] * b[i];
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * RAGService - Manages document embeddings and retrieval
 */
class RAGService {
    private documents: Map<string, DocumentChunk[]> = new Map();
    private allChunks: DocumentChunk[] = [];

    /**
     * Process a PDF file and add to knowledge base
     */
    async addPDF(file: File): Promise<string[]> {
        // In production, use pdf.js for extraction:
        // const pdfDoc = await pdfjsLib.getDocument(file).promise;
        // const chunks = await extractTextChunks(pdfDoc);

        // Mock implementation
        const text = await this.mockExtractText(file);
        const chunks = this.chunkText(text, file.name);
        const embeddedChunks = await this.embedChunks(chunks);

        this.documents.set(file.name, embeddedChunks);
        this.allChunks.push(...embeddedChunks);

        return embeddedChunks.map(c => c.id);
    }

    /**
     * Add plain text to knowledge base
     */
    async addText(text: string, source: string): Promise<string[]> {
        const chunks = this.chunkText(text, source);
        const embeddedChunks = await this.embedChunks(chunks);

        this.documents.set(source, embeddedChunks);
        this.allChunks.push(...embeddedChunks);

        return embeddedChunks.map(c => c.id);
    }

    /**
     * Query the knowledge base
     */
    async query(params: RAGQuery): Promise<RAGResult> {
        const { query, topK = 3, threshold = 0.5 } = params;

        // Embed the query
        const queryEmbedding = await this.embedText(query);

        // Find similar chunks
        const scored = this.allChunks.map(chunk => ({
            chunk,
            score: cosineSimilarity(queryEmbedding, chunk.embedding),
        }));

        scored.sort((a, b) => b.score - a.score);

        const relevantChunks = scored
            .filter(s => s.score >= threshold)
            .slice(0, topK)
            .map(s => s.chunk);

        // Generate answer (would use WebLLM in production)
        const context = relevantChunks.map(c => c.content).join('\n\n');
        const answer = await this.generateAnswer(query, context);

        return {
            chunks: relevantChunks,
            answer,
        };
    }

    /**
     * Remove a document from knowledge base
     */
    removeDocument(source: string): boolean {
        if (!this.documents.has(source)) return false;

        const docChunks = this.documents.get(source)!;
        const docIds = new Set(docChunks.map(c => c.id));

        this.allChunks = this.allChunks.filter(c => !docIds.has(c.id));
        this.documents.delete(source);

        return true;
    }

    /**
     * Get all document sources
     */
    getSources(): string[] {
        return Array.from(this.documents.keys());
    }

    /**
     * Clear all documents
     */
    clear(): void {
        this.documents.clear();
        this.allChunks = [];
    }

    // Private helper methods

    private async mockExtractText(file: File): Promise<string> {
        // In production, use pdf.js
        return `[Extracted text from ${file.name}]\n\nThis is mock content representing the extracted PDF text. In production, this would be the actual text content parsed from the PDF using pdf.js library.`;
    }

    private chunkText(text: string, source: string): Omit<DocumentChunk, 'embedding'>[] {
        const maxChunkSize = 512;
        const chunks: Omit<DocumentChunk, 'embedding'>[] = [];

        // Simple sentence-based chunking
        const sentences = text.split(/[.!?]+/).filter(s => s.trim());
        let currentChunk = '';
        let chunkIndex = 0;

        for (const sentence of sentences) {
            if ((currentChunk + sentence).length > maxChunkSize && currentChunk) {
                chunks.push({
                    id: `${source}-${chunkIndex}`,
                    content: currentChunk.trim(),
                    metadata: { source, section: `Chunk ${chunkIndex + 1}` },
                });
                currentChunk = sentence;
                chunkIndex++;
            } else {
                currentChunk += ' ' + sentence;
            }
        }

        if (currentChunk.trim()) {
            chunks.push({
                id: `${source}-${chunkIndex}`,
                content: currentChunk.trim(),
                metadata: { source, section: `Chunk ${chunkIndex + 1}` },
            });
        }

        return chunks;
    }

    private async embedChunks(
        chunks: Omit<DocumentChunk, 'embedding'>[]
    ): Promise<DocumentChunk[]> {
        // In production, use transformer.js or similar for embeddings
        return Promise.all(chunks.map(async chunk => ({
            ...chunk,
            embedding: await this.embedText(chunk.content),
        })));
    }

    private async embedText(text: string): Promise<number[]> {
        // Mock embedding - 384 dimensions (MiniLM compatible)
        // In production, use @xenova/transformers for real embeddings
        const size = 384;
        const embedding = new Array(size);

        // Create deterministic pseudo-embedding based on text hash
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            hash = ((hash << 5) - hash) + text.charCodeAt(i);
            hash = hash & hash;
        }

        for (let i = 0; i < size; i++) {
            // Generate pseudo-random values based on hash
            hash = Math.sin(hash * (i + 1)) * 10000;
            embedding[i] = hash - Math.floor(hash);
        }

        // Normalize
        const norm = Math.sqrt(embedding.reduce((sum, v) => sum + v * v, 0));
        return embedding.map(v => v / norm);
    }

    private async generateAnswer(query: string, context: string): Promise<string> {
        // In production, use WebLLM
        return `Based on the documents in your knowledge base:\n\n"${context.slice(0, 200)}..."\n\nThe answer to "${query}" would be generated here by the local LLM.`;
    }
}

// Singleton instance
export const ragService = new RAGService();

/**
 * useRAG - React hook for RAG operations
 */
export function useRAG() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [sources, setSources] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    const addDocument = useCallback(async (file: File) => {
        setIsProcessing(true);
        setError(null);

        try {
            await ragService.addPDF(file);
            setSources(ragService.getSources());
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Failed to process document');
        } finally {
            setIsProcessing(false);
        }
    }, []);

    const addText = useCallback(async (text: string, source: string) => {
        setIsProcessing(true);
        setError(null);

        try {
            await ragService.addText(text, source);
            setSources(ragService.getSources());
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Failed to add text');
        } finally {
            setIsProcessing(false);
        }
    }, []);

    const query = useCallback(async (queryText: string, topK = 3) => {
        setIsProcessing(true);
        setError(null);

        try {
            return await ragService.query({ query: queryText, topK });
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Query failed');
            return null;
        } finally {
            setIsProcessing(false);
        }
    }, []);

    const removeDocument = useCallback((source: string) => {
        ragService.removeDocument(source);
        setSources(ragService.getSources());
    }, []);

    const clear = useCallback(() => {
        ragService.clear();
        setSources([]);
    }, []);

    return {
        isProcessing,
        sources,
        error,
        addDocument,
        addText,
        query,
        removeDocument,
        clear,
    };
}
