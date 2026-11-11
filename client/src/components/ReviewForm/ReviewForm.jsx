// Hayes Meekins

import { useState } from "react";
import styles from "./ReviewForm.module.css";

function ReviewForm({ movieTitle, onClose, onSubmit, submitting, error }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        await onSubmit({ rating, comment });
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.panel}
                role="dialog"
                aria-modal="true"
                aria-labelledby="review-panel-title"
                onClick={(event) => event.stopPropagation()}
            >
                <div className={styles.header}>
                    <div>
                        <h2 id="review-panel-title">Write a Review</h2>
                        <p>{movieTitle}</p>
                    </div>

                    <button
                        type="button"
                        className={styles.close}
                        onClick={onClose}
                        aria-label="Close review panel"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <label>Your Rating</label>

                    <div className={styles.stars}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                className={
                                    star <= rating
                                        ? styles.selectedStar
                                        : styles.star
                                }
                                onClick={() => setRating(star)}
                                disabled={submitting}
                                aria-label={`${star} stars`}
                                aria-pressed={rating === star}
                            >
                                ★
                            </button>
                        ))}
                    </div>

                    <label htmlFor="review-comment">
                        Your Review
                    </label>

                    <textarea
                        id="review-comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        placeholder="What did you think of this movie?"
                        maxLength={1000}
                        required
                        disabled={submitting}
                    />

                    {error && <p className={styles.error}>{error}</p>}

                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={styles.cancel}
                            onClick={onClose}
                            disabled={submitting}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className={styles.submit}
                            disabled={
                                submitting ||
                                rating === 0 ||
                                !comment.trim()
                            }
                        >
                            {submitting ? "Submitting..." : "Submit Review"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ReviewForm;
