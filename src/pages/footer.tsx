export const Footer = (props: { title: string }) => {
    return (
        <footer class="footer" style="text-align: center;">
            <div class="social-links" style="font-size: 30px;">
                <a style="margin: 0 10px;" href="https://github.com/danny-yamamoto" target="_blank"><i class="fab fa-github"></i></a>
                <a href="https://twitter.com/dai_s_a_n" target="_blank"><i class="fab fa-twitter"></i></a>
            </div>
            <hr></hr>
            <p>&copy; 2023 {props.title}. All rights reserved.</p>
        </footer>
    )
  }
  